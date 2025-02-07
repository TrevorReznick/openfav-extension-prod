// Funzione di mapping
export function mapKeys(target, source, mappings, user_id, url) {
    Object.keys(mappings).forEach(key => {
        const sourceKey = mappings[key];
        if (sourceKey instanceof Function) {
            // Se è una funzione, eseguila passando source, user_id e url
            target[key] = sourceKey(source, user_id, url);
        } else {
            // Altrimenti, usa il valore diretto da source
            target[key] = source[sourceKey];
        }
    });
}