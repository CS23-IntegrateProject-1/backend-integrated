import { Request, Response} from "express";

export const TestApiConnection = async (req: Request, res:Response) => {

    const url = 'https://mik.harmoni.social/service/table';

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
        console.log('Response from other website:', data);
        res.status(200).json({message: "Api message"});
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch data from other website');
      }

}