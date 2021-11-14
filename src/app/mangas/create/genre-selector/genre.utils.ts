import { Genre } from '@shared/models/genre.model';

export class GenreUtils {

  public static findIndex(genres: Genre[], genre: Genre) {
    return genres.findIndex(g => g.id === genre.id);
  }
}
