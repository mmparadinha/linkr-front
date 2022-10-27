import axios from "axios";

export default async function InfiniteScroll() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline`);
    } catch (error) {
        
    }
}