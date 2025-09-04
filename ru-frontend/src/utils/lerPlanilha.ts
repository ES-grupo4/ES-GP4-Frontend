import * as XLSX from "xlsx";

export interface RowData {
	[key: string]: string;
}

export async function readExcelFile(file: File): Promise<RowData[]> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event: ProgressEvent<FileReader>) => {
			const binaryStr = event.target?.result;
			if (typeof binaryStr !== "string") {
				reject(new Error("Erro ao ler arquivo."));
				return;
			}

			try {
				const workbook = XLSX.read(binaryStr, { type: "binary" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const jsonData: RowData[] = XLSX.utils.sheet_to_json(worksheet, {
					raw: false,
				});
				resolve(jsonData);
			} catch (err) {
				console.log(err);
				reject(new Error("Erro ao ler arquivo."));
			}
		};

		reader.onerror = () => reject(new Error("Erro ao carregar arquivo."));
		reader.readAsArrayBuffer(file);
	});
}
