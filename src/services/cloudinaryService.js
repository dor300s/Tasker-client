import axios from 'axios'

export function uploadImg(ev) {
    const CLOUD_NAME = 'dcelvs5jv'; // find it in your cloudinary account (main page)
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    let files = Object.values(ev.target.files)

    return Promise.all(files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'd3b1nly1'); // second parameter is the upload preset (you can find it in cloudinary settings)
        return axios.post(UPLOAD_URL, formData)
            .then(res => res.data.url)
            .catch(err => console.log(err))
    })
    ).then(res => res)
}
