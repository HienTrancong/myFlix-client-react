import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

  const [movies, setMovies] = useState([
    {
      _id: "61db16488a86b50b628b9d36",
      Title: "Drive My Car",
      Description: "An aging, widowed actor seeks a chauffeur. The actor turns to his go-to mechanic, who ends up recommending a 20-year-old girl. Despite their initial misgivings, a very special relationship develops between the two.",
      Genre: { Name: "Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)." },
      Director: { Name: "Ryûsuke Hamaguchi", Bio: "Ryusuke Hamaguchi is a Japanese film director and screenwriter.", Birth: "1978", Death: null },
      ImagePath: "https://www.cinemaclock.com/images/posters/1000x1500/67/-doraibu-mai-ka-2021-2021-i-movie-poster.jpg",
      Featured: false
    },
    {
      _id: "61db17888a86b50b628b9d38",
      Title: "Slalom",
      Description: "Under the guidance of a strict ex champion, a promising 15 year old girl trains as a professional skiing star. Will she be able to endure the physical and emotional pressures?The film follows Lyz Lopez, a 15-year-old up-an-coming skiing star who's under training by ex-champion Fred. As the film unfurls, Fred's tutoring crosses into the realm of emotional and physical abuse. It further leads to developing an unhealthy physical relationship that gives validation to them both.",
      Genre: { Name: "Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)." },
      Director: { Name: "Charlène Favier", Bio: "Charlène Favier is a director and writer, known for Slalom (2020), Omessa (2015).", Birth: "1985", Death: null },
      ImagePath: "https://www.cinemaclock.com/images/posters/1000x1500/86/slalom-2020-i-movie-poster.jpg",
      Featured: false
    },
    {
      _id: "61db14fb8a86b50b628b9d35",
      Title: "For Those Who Can Tell No Tales",
      Description: "An Australian tourist discovers the legacy of war-time atrocities when she stays in a town on the border of Bosnia and Serbia.", Genre: { Name: "Drama", Description: "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy)." },
      Director: { Name: "Jasmila Zbanic", Bio: "Jasmila Žbanić is a Bosnian film director, screenwriter and producer, best known for having written and directed Quo Vadis, Aida?, which earned her nominations for the Academy Award for Best Foreign Language Film, the BAFTA Award for Best Film Not in the English Language, and the BAFTA Award for Best Direction.Jasmila Zbanic was born on December 19, 1974 in Sarajevo, Bosnia and Herzegovina, Yugoslavia.", Birth: "1974", Death: null },
      ImagePath: "https://www.cinemaclock.com/images/posters/1000x1500/96/za-one-koji-ne-mogu-da-govore-2013-orig-poster.jpg",
      Featured: false
    }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //if SelectedMovie is not null
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    )
  };

  //if Movie state is empty array
  if (movies.length === 0) {
    return <div> The list is empty!</div>
  }
  //if book state is not empty array
  return (
    <div className="my-flix">
      <div>
        {movies.map((movie => {
          return <MovieCard key={movie._id} movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie)
            }}
          />;
        }))}
      </div>
      <button>Test</button>
    </div>
  );
};