function generateRandomUserId() {
  let userId = "";

  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 10);

    userId += randomNumber;
  }

  return userId;
}

export default generateRandomUserId;
