export const downloadCSV = (data, filename = 'dados.csv') => {
    if (!data || !data.length) return;

    // Pega os cabeçalhos das chaves do primeiro objeto
    const headers = Object.keys(data[0]).join(',');

    // Converte as linhas
    const rows = data.map(obj =>
        Object.values(obj).map(val => `"${val}"`).join(',') // Aspas evitam quebras se houver vírgula no valor
    ).join('\n');

    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};