import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Template} from '../template/index';
import { MoviesListDto } from './movies-list.dto';


@Controller('movies')
export class MoviesController {
    constructor(private moviesService:MoviesService){}
    
    @Get()
    getMovie(){
       return Template()
    }

    @Post()
    async getMovies(@Body() moviesListDto: MoviesListDto){
        try {
            const movies = await this.moviesService.getMovies(moviesListDto.title, moviesListDto.page);
            return movies;
        } catch (error) {
            throw error;
        }

    }
}
