// local api provider
// 
// to remember - 
// 
// adjesting aiCredits in home 
// -- | | -- todays focus in home
// 

import axios from "axios";
import { API_BASE_URL } from "../../constants";


export const callSendPromptApi = async (textToSubmit: string) => {


  try {
    
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/prompt`,
      {
        prompt: textToSubmit,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `, // If applicable
        },
      },
    );
    return response.data;
    
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  } 
  
};
