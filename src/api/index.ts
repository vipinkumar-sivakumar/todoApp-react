import axios from "axios";

const Base_URL = 'http://localhost:3000/todo';


interface FormData {
    title: string;
    desc: string;
}

export const posttodo = async (data: FormData) => {
    try {
      const responce = await axios.post(Base_URL, data);
      console.log("the response is ", responce);
      return responce.data;
    } catch (errors) {
      console.log(errors);
    }
  };
export const gettodo = async () => {
    try {
        console.log("baseURL ", Base_URL);
        const responce = await axios.get(Base_URL);
        console.log("the responce is ", responce);        
        return responce.data;

    }
    catch (errors) {
        console.log(errors);
    }
};

export const gettodobyid = async (id: string) => {
    try {
        const responce = await axios.get(`${Base_URL}/${id}`);
        console.log("the responce is ", responce);
        return responce.data;
    }
    catch (errors) {
        console.log(errors);

    }
};
export const puttoddobyid = async (id: string, data: FormData) => {
    try {
        const responce = await axios.put(`${Base_URL}/${id}`, data);
        console.log("the responce is ", responce);
        return responce.data;
    }
    catch (errors) {
        console.log(errors);

    }

};
export const deletebyid = async (id: string) => {
    try {
        const responce = await axios.delete(`${Base_URL}/${id}`);
        console.log("the responce is ", responce);
        return responce.data;
    }
    catch (errors) {
        console.log(errors);

    }

};