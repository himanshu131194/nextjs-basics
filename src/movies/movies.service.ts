import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class MoviesService {
    
    constructor(private readonly httpService: HttpService ){}

    async getMovies(title, page): Promise<any> {
          try {
            const response = await this.httpService.get("http://www.omdbapi.com/?s="+title+"&apikey=ece7bcc0&page="+page).toPromise();
            return response.data;
          } catch (error) {
              throw error;
          }

    }
}
