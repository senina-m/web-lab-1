class Connector {
    async sendData(coordinates, url) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(coordinates)
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Ошибка HTTP: " + response.status); //todo: create my oun exception
        }
    }
}