export function downloads(data: any, fileName: string) {
    const fileToSave = new Blob([JSON.stringify(data)], {
        type: "application/json;charset=utf-8"
    });
    const blobUrl = URL.createObjectURL(fileToSave);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.target = "_blank";
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(blobUrl);
}