import "./Loading.scoped.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Blogs from "./Blogs";

function Loading() {
  const posts = [
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 5) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
    {
      _id: "",
      guest: "",
      title: "The Micheletty circus Christmas village",
      country: "France",
      location: "z, 115 Bd Charles de Gaulle",
      event: "",
      description: "",
      rating: 4,
      images: ["8N8gL9oEBZnullcampagne.jpg"],
      likes: [],
      status: "active",
      created: "2024-01-05T20:29:14.763Z",
      __v: 17,
      height: Math.floor(Math.random() * 10) + 2,
    },
  ];

  return (
    <div className="Loading">
      <Blogs posts={posts} loading="true" />
    </div>
  );
}

export default Loading;
