import axios from 'axios'

/* const axios = Axios.create({
    withCredentials: true
})
 */

export function uploadImg(ev) {
    const CLOUD_NAME = 'dt3cfrjpr'; 
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const dataImg = Object.values(ev.target.files)

    const formDataImg = dataImg.map(img => {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset', 'rvddiiry'); // second parameter is the upload preset (you can find it in cloudinary settings)
        return axios.post(UPLOAD_URL, formData)
            .then(res => res.data)
            .then(res => {
                return res;
            })
            .catch(err => console.log(err))
    })

    return Promise.all(formDataImg)

}
