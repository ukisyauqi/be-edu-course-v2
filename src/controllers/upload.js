export async function uploadController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // File berhasil diunggah
    res.status(200).json({
      message: "File uploaded successfully",
      filePath: `./uploads/${req.file.filename}`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
