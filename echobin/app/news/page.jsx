"use client";
import { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState(null);
  const [displayCount, setDisplayCount] = useState(18);

  // Calculate the date 20 days ago
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(previousDate.getDate() - 20);
  const formattedPrevDate = previousDate.toISOString().split("T")[0];

  const url = `https://newsapi.org/v2/everything?q=waste%20management%20OR%20Swachh%20Bharat%20Abhiyan%20OR%20cleaning&from=${formattedPrevDate}&sortBy=publishedAt&apiKey=58dbbe2b20b34fcdbf5c8bfe16d8cd50`;

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 6);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Added py-8 */}
      <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"> {/* Added mb-12 */}
        {data &&
          data.articles
            .filter((article) => article.urlToImage)
            .reduce((uniqueArticles, article) => {
              const isDuplicate = uniqueArticles.some(
                (existingArticle) =>
                  existingArticle.title === article.title &&
                  existingArticle.source.name === article.source.name
              );
              if (!isDuplicate) uniqueArticles.push(article);
              return uniqueArticles;
            }, [])
            .slice(0, displayCount)
            .map((d, index) => (
              <a
                key={index}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-105 border border-gray-200 bg-white"
              >
                <div className="relative">
                  <img
                    src={d.urlToImage}
                    alt="Article"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                    {d.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {d.description || "No description available."}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 flex items-center">
                    <span className="mr-2">Source:</span>
                    <span>{d.source.name}</span>
                  </div>
                </div>
              </a>
            ))}
      </div>

      {data && data.articles.length > displayCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
