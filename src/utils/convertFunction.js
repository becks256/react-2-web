export const convertFunction = (functionString) => {
  try {
    // Check if it's an arrow function
    if (!functionString.includes("=>")) {
      return new Function(functionString);
    }

    // Extract arguments and body using regex
    const argsBodyRegex = /^(?:\((.*?)\)|(.*?))\s*=>\s*([^]+)$/;
    const match = argsBodyRegex.exec(functionString);

    if (!match) {
      throw new Error("Invalid function string");
    }

    // Separate arguments and body
    const args = match[1] || match[2];
    let body = match[3];

    // Check if body is a single expression or a block
    if (!body.trim().startsWith("{")) {
      body = "return " + body; // Add return for single expression
    }

    // Create the function
    return new Function(args, body);
  } catch (err) {
    console.error(err);
  }
};
