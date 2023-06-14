export const getDate = () => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Місяці починаються з 0, тому потрібно додати 1
    const year = currentDate.getFullYear();
    
    const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;
    
    return formattedDate
};