    this.entries.push({ values, pointer });
  }
};

// src/code-generation/components/cms/bundled/fetchWithRetries.ts
var maxRetries = 3;
var baseDelay = 250;
var retriableHTTPCodes = [
  408,
  // Request Timeout
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
];
var fetchWithRetries = async (input, init) => {
  let retryCount = 0;
  while (true) {
    try {
      const res = await fetch(input, init);
      if (!retriableHTTPCodes.includes(res.status) || ++retryCount > maxRetries) {
        return res;
      }
    } catch (error) {
      if (init?.signal?.aborted || ++retryCount > maxRetries) {
        throw error;
      }
    }
    await retryDelay(retryCount);
  }
};
async function retryDelay(retryCount) {
  const backoffExponent = retryCount - 1;
  const jitter = Math.random() + 1;
  const timeout = Math.floor(baseDelay * jitter * 2 ** backoffExponent);
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// src/code-generation/components/cms/bundled/rangeRequest.ts
async function rangeRequest(url, ranges) {
  const collapsedRanges = collapseRanges(ranges);
  const rangeStrings = [];
  let expectedLength = 0;
  for (const range of collapsedRanges) {
    rangeStrings.push(\`\${range.from}-\${range.to - 1}\`);
    expectedLength += range.to - range.from;
  }
  const rangeUrl = new URL(url);
  const rangeQuery = rangeStrings.join(",");
  rangeUrl.searchParams.set("range", rangeQuery);
  const response = await fetchWithRetries(rangeUrl);
  if (response.status !== 200) {
    throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
  }
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (bytes.length !== expectedLength) {
    throw new Error("Request failed: Unexpected response length");
  }
  const file = new PartialFile();
  let start = 0;
  for (const range of collapsedRanges) {
    const length = range.to - range.from;
    const end = start + length;
    const part = bytes.subarray(start, end);
    file.write(range.from, part);
    start = end;
  }
  return ranges.map((range) => {
    return file.read(range.from, range.to - range.from);
  });
}
var PartialFile = class {
  constructor() {
    __publicField(this, "chunks", []);
  }
  read(position, length) {
    for (const chunk of this.chunks) {
      if (position < chunk.start) {
        throw new Error("Missing data");
      }
      if (position > chunk.end) {
        continue;
      }
      if (position + length > chunk.end) {
        throw new Error("Missing data");
      }
      const from = position - chunk.start;
      const to = from + length;
      return chunk.data.slice(from, to);
    }
    throw new Error("Missing data");
