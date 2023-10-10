const web = require('./aplications/web');

// run session wa

// async function getInitRunSessionWa () {
   
//     try {
//         const results = await initialGenerateQrCode();
//         return results;

//     } catch (error) {
//         return error;
//     }
// }
// getInitRunSessionWa();

const PORT = process.env.APP_PORT;
web.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});