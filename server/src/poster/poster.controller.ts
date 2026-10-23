import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PosterService } from './poster.service';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('posters')
@Controller('posters')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new poster' })
  @ApiResponse({ status: 201, description: 'Poster created successfully' })
  create(@Body() createPosterDto: CreatePosterDto) {
    return this.posterService.create(createPosterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posters' })
  @ApiResponse({ status: 200, description: 'Return all posters' })
  findAll() {
    return this.posterService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active posters' })
  @ApiResponse({ status: 200, description: 'Return active posters' })
  getActivePosters() {
    return this.posterService.getActivePostersOnly();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a poster by ID' })
  @ApiResponse({ status: 200, description: 'Return the poster' })
  @ApiResponse({ status: 404, description: 'Poster not found' })
  findOne(@Param('id') id: string) {
    return this.posterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a poster' })
  @ApiResponse({ status: 200, description: 'Poster updated successfully' })
  @ApiResponse({ status: 404, description: 'Poster not found' })
  update(@Param('id') id: string, @Body() updatePosterDto: UpdatePosterDto) {
    return this.posterService.update(id, updatePosterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a poster' })
  @ApiResponse({ status: 200, description: 'Poster deleted successfully' })
  @ApiResponse({ status: 404, description: 'Poster not found' })
  remove(@Param('id') id: string) {
    return this.posterService.remove(id);
  }
  
  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle poster active status' })
  @ApiResponse({ status: 200, description: 'Poster status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Poster not found' })
  toggleActive(@Param('id') id: string) {
    return this.posterService.toggleActive(id);
  }

}