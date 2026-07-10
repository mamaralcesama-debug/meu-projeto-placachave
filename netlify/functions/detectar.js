// Este código roda no servidor da Netlify
const vision = require('@google-cloud/vision');

exports.handler = async (event, context) => {
    const client = new vision.ImageAnnotatorClient({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }
    });

    const body = JSON.parse(event.body);
    const [result] = await client.textDetection({ image: { content: body.image } });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ texto: result.fullTextAnnotation?.text })
    };
};
