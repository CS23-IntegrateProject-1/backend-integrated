import { Request, Response} from "express";


export const ApiConnection = async (req: Request, res:Response) => {
    const url = 'https://mikserver.harmoni.social/showMenu';

    try {
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        // console.log('Response from other website:', data);
        res.status(200).json(data);
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch data from other website');
      }

}