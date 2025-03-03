export function formatTimeDifference(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) {
        return "1分钟";
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟`;
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时`;
    } else if (diff < 2592000000) {
        return `${Math.floor(diff / 86400000)}天`;
    } else if (diff < 7776000000) {
        return `${Math.floor(diff / 2592000000)}月`;
    } else {
        return "三月前";
    }
}
