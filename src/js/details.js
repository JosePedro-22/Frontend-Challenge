    // Função para buscar os detalhes de uma notícia pelo ID
    async function fetchNewsById(newsId) {
        const apiUrlById = `http://backendchallenge.test/api/getById/${newsId}`;
        try {
            const response = await fetch(apiUrlById);
            const data = await response.json();
            displayNewsDetails(data.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes da notícia:', error);
        }
    }

    function displayNewsDetails(newsDetails) {
        
        const newsTitleElement = document.getElementById('news-title');
        const newsImageElement = document.getElementById('news-image');
        const newsDescriptionElement = document.getElementById('news-description');
        const newsFullTextElement = document.getElementById('news-full-text');
        const newsPublishDateElement = document.getElementById('news-publish-date');

        newsImageElement.src = newsDetails.image;

        const dataString = newsDetails.publish_date
        const partesData = dataString.split("-");
        const data = new Date(partesData[0], partesData[1] - 1, partesData[2]);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        newsTitleElement.textContent = `${newsDetails.title}`;
        newsDescriptionElement.textContent = `${newsDetails.description}`;
        newsFullTextElement.textContent = `${newsDetails.full_txt}`;
        newsPublishDateElement.textContent = `Data de Publicação: ${dataFormatada}`;

        document.getElementById('loader').classList.add('d-none');
        document.getElementById('news-details').classList.remove('d-none');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    if (newsId) {
        fetchNewsById(newsId);
    } else {
        console.error('ID da notícia não fornecido na URL.');
    }