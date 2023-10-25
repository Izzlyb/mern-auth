import express from "express";

export const User = (req, res) => {
  res.json({ 
    message: "Returns a User from user.route.js"
  });
};

export default User;
