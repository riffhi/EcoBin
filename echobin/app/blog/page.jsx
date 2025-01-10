import React from "react";

// Static blog data
const blogs = [
  {
    id: 1,
    title: "The Importance of Waste Segregation",
    content: `
      Waste segregation is essential for maintaining environmental balance, ensuring efficient waste management, and promoting sustainability. It involves separating waste into different categories based on its nature, such as biodegradable, recyclable, and hazardous materials. This process plays a significant role in protecting the environment, encouraging recycling, and minimizing health hazards.

By segregating waste, we can reduce the burden on landfills. Non-biodegradable materials like plastics, which take hundreds of years to decompose, are kept separate and sent for recycling, preventing them from accumulating in the environment. Biodegradable waste can be composted and used as organic fertilizer, reducing the dependency on chemical fertilizers and promoting sustainable agriculture.

Segregating waste also ensures that hazardous materials, such as batteries, medical waste, and chemicals, do not mix with regular waste. This prevents contamination of soil and water, safeguarding ecosystems and human health. When waste is not segregated, toxic substances can leach into the environment, causing long-term damage to natural resources and posing serious health risks to communities.

In addition, waste segregation supports recycling efforts by providing clean and sorted materials that can be processed into new products. This reduces the demand for raw materials, conserves natural resources, and lowers energy consumption during manufacturing processes. Proper segregation also reduces greenhouse gas emissions, contributing to the fight against climate change.

Finally, segregating waste promotes cleaner and safer communities. It minimizes the spread of diseases caused by uncollected or improperly disposed of waste, enhancing the overall quality of life. It also raises awareness about responsible waste management and encourages individuals and organizations to adopt sustainable practices.

In conclusion, waste segregation is a crucial practice that benefits the environment, human health, and the economy. By making it a part of our daily lives, we can contribute to a cleaner, greener, and more sustainable future.
    `,
    author: "Riddhi Bhanushali",
    date: "2025-01-09",
  },
  {
    id: 2,
    title: "Effective Waste Management Strategies",
    content: `
      Waste management involves the collection, transportation, and disposal of waste materials in an environmentally friendly way. 
      Strategies such as composting, recycling, and reducing single-use plastics can help manage waste more effectively. 
      Community participation and government policies also play a vital role in ensuring waste management is sustainable.
    `,
    author: "Eco Solutions",
    date: "2025-01-08",
  },
  {
    id: 3,
    title: "How to Reduce Plastic Waste",
    content: `
      Plastic waste is one of the biggest environmental challenges we face today. 
      You can reduce plastic waste by avoiding single-use plastics, carrying reusable bags and bottles, and choosing biodegradable products. 
      Education and awareness about the impact of plastic waste on marine life and ecosystems are crucial to addressing this issue.
    `,
    author: "Green Planet",
    date: "2025-01-07",
  },
];

export default function BlogPage() {
  return (
    <div style={{ padding: "20px", fontFamily: " Montserrat" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}><strong>Blogs</strong></h1>
      <div>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h2><strong>{blog.title}</strong></h2>
            <p>
              <strong>Author:</strong> {blog.author} | <strong>Date:</strong> {blog.date}
            </p>
            <p style={{ lineHeight: "1.6" }}>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
