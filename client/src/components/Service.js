import axios from 'axios';
const url = 'http://localhost:5000/api/threads/';

class Service {

    //Get Posts
    static getPosts() {
        return new Promise((resolve,reject)=>{
            try{
                const res =  axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post=>({
                        ...post,
                        createdAt : new Date(post.createdAt)
                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }
}

export default Service;