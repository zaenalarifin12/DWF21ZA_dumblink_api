module.exports = async (req, res) => {
  try {
    const image = req.files.imageLink[0].filename;

    console.log(image);
    return res.json({
      status: "success",
      data: {
        image: image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "ada error",
    });
  }
};
