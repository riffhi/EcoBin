'use client';

import React, { useState } from "react";

// Static blog data
const blogs = [
  {
    id: 1,
    title: "The Importance of Waste Segregation",
    content: ` Waste segregation is essential for maintaining environmental balance, ensuring efficient waste management, and promoting sustainability. It involves separating waste into different categories based on its nature, such as biodegradable, recyclable, and hazardous materials. This process plays a significant role in protecting the environment, encouraging recycling, and minimizing health hazards.
    
    By segregating waste, we can reduce the burden on landfills. Non-biodegradable materials like plastics, which take hundreds of years to decompose, are kept separate and sent for recycling, preventing them from accumulating in the environment. Biodegradable waste can be composted and used as organic fertilizer, reducing the dependency on chemical fertilizers and promoting sustainable agriculture.
    
    Segregating waste also ensures that hazardous materials, such as batteries, medical waste, and chemicals, do not mix with regular waste. This prevents contamination of soil and water, safeguarding ecosystems and human health. When waste is not segregated, toxic substances can leach into the environment, causing long-term damage to natural resources and posing serious health risks to communities.
    
    In addition, waste segregation supports recycling efforts by providing clean and sorted materials that can be processed into new products. This reduces the demand for raw materials, conserves natural resources, and lowers energy consumption during manufacturing processes. Proper segregation also reduces greenhouse gas emissions, contributing to the fight against climate change.
    
    Finally, segregating waste promotes cleaner and safer communities. It minimizes the spread of diseases caused by uncollected or improperly disposed of waste, enhancing the overall quality of life. It also raises awareness about responsible waste management and encourages individuals and organizations to adopt sustainable practices.
    
    In conclusion, waste segregation is a crucial practice that benefits the environment, human health, and the economy. By making it a part of our daily lives, we can contribute to a cleaner, greener, and more sustainable future.`,
    author: "Riddhi Bhanushali",
    date: "2025-01-09",
  },
  {
    id: 2,
    title: "Effective Waste Management Strategies",
    content: `Effective waste management is a crucial aspect of maintaining a healthy environment and ensuring sustainable development. As urbanization increases and waste generation grows, it becomes more important for communities, businesses, and governments to adopt strategies that reduce waste production and promote recycling.

One of the key strategies in waste management is waste minimization. This involves reducing the amount of waste generated at the source through techniques such as designing products that use fewer resources, reducing packaging materials, and encouraging the use of reusable items. By focusing on prevention rather than just disposal, communities can significantly reduce the volume of waste that ends up in landfills and incinerators.

Recycling is another cornerstone of effective waste management. Sorting materials such as paper, glass, plastic, and metals allows for the reuse of these materials in new products, reducing the need for raw materials and conserving energy. Local governments can help by setting up accessible recycling bins, educating the public on proper sorting techniques, and providing incentives for people to participate in recycling programs.

Composting is another important strategy, especially for organic waste such as food scraps and yard trimmings. Composting breaks down organic materials into nutrient-rich soil that can be used in gardening and agriculture. Communities and individuals can start composting at home or participate in local composting programs, which significantly reduce the amount of organic waste that ends up in landfills.

Additionally, the adoption of waste-to-energy technologies is gaining momentum. These technologies convert non-recyclable waste into energy, reducing landfill usage while producing electricity or heat. Waste-to-energy plants can help mitigate the environmental impact of waste disposal while generating renewable energy, though careful planning is necessary to avoid negative environmental consequences.

An essential component of effective waste management is public awareness and community involvement. Educating people about the benefits of reducing, reusing, and recycling waste can lead to behavior changes that collectively make a big impact. Schools, businesses, and local governments can work together to promote waste management practices through campaigns, workshops, and local events.

In conclusion, effective waste management strategies require a multi-faceted approach, involving waste minimization, recycling, composting, waste-to-energy technologies, and public education. By embracing these strategies, communities can reduce their environmental footprint, conserve resources, and move towards a more sustainable future.`,
    author: "Eco Solutions",
    date: "2025-01-08",
  },
  {
    id: 3,
    title: "How to Reduce Plastic Waste",
    content: `Reducing plastic waste is an essential step toward protecting the environment and promoting sustainability. Plastic, which is non-biodegradable and takes centuries to break down, often ends up polluting the oceans, harming wildlife, and contributing to climate change. To tackle this issue, individuals, businesses, and governments need to implement strategies that focus on reducing plastic consumption and improving disposal practices.

One of the most effective ways to reduce plastic waste is to minimize single-use plastic items. Products like plastic bags, bottles, straws, and utensils are used briefly but take hundreds of years to decompose. Opting for reusable alternatives, such as cloth bags, metal or bamboo straws, and stainless steel or glass containers, can significantly cut down on the amount of plastic waste generated. Encouraging the use of these sustainable options, both at home and in public spaces, can lead to a notable reduction in plastic consumption.

Another strategy is to support businesses and manufacturers that use alternative materials to plastic. Many companies are now opting for biodegradable materials, such as paper, glass, or plant-based plastics, which are more environmentally friendly. By supporting these businesses and opting for products with minimal or sustainable packaging, consumers can help create a demand for eco-friendly alternatives, thus promoting a shift away from plastic.

For those who do use plastic products, recycling is crucial. However, it is important to know which plastics can be recycled and how to properly dispose of them. Local governments and communities often provide guidelines on recycling practices, making it easier for individuals to sort their plastic waste and ensure it is processed correctly. Participating in local recycling programs helps to prevent plastic from ending up in landfills or polluting the environment.

Educating the public about the environmental impacts of plastic waste is also essential. Awareness campaigns can help individuals understand the consequences of plastic pollution and inspire them to adopt more sustainable behaviors. Schools, businesses, and organizations can play a key role in spreading this information and encouraging others to make environmentally conscious choices.

Governments and policymakers have an important role in reducing plastic waste as well. They can implement laws and regulations that limit plastic production and promote recycling programs. Banning or taxing single-use plastic items, such as plastic bags or straws, has been effective in some countries and regions, encouraging businesses and consumers to find alternatives. Moreover, investing in plastic waste management infrastructure, including efficient recycling facilities and waste-to-energy systems, can help ensure that plastic waste is disposed of responsibly.

Finally, individuals can contribute to reducing plastic waste by adopting a mindful approach to consumption. By making conscious choices about the products they purchase, such as selecting items with minimal packaging or buying in bulk, people can actively reduce the amount of plastic they bring into their homes. Participating in local clean-up events and volunteering for environmental organizations can also make a positive impact on communities.

In conclusion, reducing plastic waste requires a collective effort from individuals, businesses, governments, and communities. By minimizing single-use plastics, supporting sustainable alternatives, practicing proper recycling, and advocating for policy changes, we can significantly reduce the environmental impact of plastic waste and move towards a cleaner, healthier planet.`,
    author: "Green Planet",
    date: "2025-01-07",
  },
];
export default function BlogPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ padding: "40px", fontFamily: "Montserrat, sans-serif", backgroundColor: "#f4f4f9" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2d3e50", fontWeight: "bold" }}>Blogs</h1>
      <div>
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: hoveredIndex === index ? "0 6px 12px rgba(0, 0, 0, 0.15)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
              transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h2 style={{ color: "#3e4e5e", fontSize: "1.6rem", marginBottom: "10px" }}>
              <strong>{blog.title}</strong>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#757575", marginBottom: "15px" }}>
              <strong>Author:</strong> {blog.author} | <strong>Date:</strong> {blog.date}
            </p>
            <p style={{ lineHeight: "1.7", color: "#333", fontSize: "1rem" }}>
              {blog.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
