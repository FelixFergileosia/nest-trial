import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

// Import data mock
import catsData from './cats.mock.json';

@Injectable()
export class CatsService {
  private cats = catsData;

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    let cat = this.cats.find(cat => cat.id === id);
    if(!cat) {
      return `Cat with id ${id} not found`;
    } else {
      return cat;
    }
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
