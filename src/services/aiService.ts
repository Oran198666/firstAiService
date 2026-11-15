import axios from "axios";
import { appConfig } from "../utils/app-config";

class AiService{
    public async getCompletion(systemPrompt:string,userPrompt:string): Promise<string>{
        const body = {
            model:appConfig.ApiAiModel,
            messages:[
                {role:"system", content: systemPrompt},
                {role:"user", content: userPrompt}
            ]
        }
        const options = {
            headers: {
                Authorization: `Bearer ${appConfig.ApiAiKey}`,
                "Content-Type": "application/json"
            }
        }
        const response = await axios.post(appConfig.ApiAiUrl,body, options);
        const completion = response.data.choices[0].message.content;
        return completion;
    }
}

export const aiService = new AiService();