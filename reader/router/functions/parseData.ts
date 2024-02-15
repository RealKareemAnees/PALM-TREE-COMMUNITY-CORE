interface ParsedData {
  read_type: string;
  file_path: string;
}

/**
 *
 * @param data
 * @returns { read_type: parsedData.read_type, file_path: parsedData.file_path }
 */
function parseData(data: any): ParsedData {
  const parsedData: ParsedData = JSON.parse(data);
  return { read_type: parsedData.read_type, file_path: parsedData.file_path };
}

export { parseData };
