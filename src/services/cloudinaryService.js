import axios from 'axios'

/* const axios = Axios.create({
    withCredentials: true
})
 */

export function uploadImg(ev) {
    const CLOUD_NAME = 'dcelvs5jv'; // find it in your cloudinary account (main page)
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    console.log(ev.target.files);
    let file = ev.target.files[0]
    console.log('file', file);


    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'd3b1nly1'); // second parameter is the upload preset (you can find it in cloudinary settings)
    return axios.post(UPLOAD_URL, formData)
        .then(res => res.data.url)
        .catch(err => console.log(err))
}

