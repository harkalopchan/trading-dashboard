export const formatChartTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], { 
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit" 
    });
}

export const formatPrice = (price: number): string => {
    return price.toFixed(2);
}