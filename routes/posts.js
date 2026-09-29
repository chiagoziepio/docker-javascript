const prisma = require("../utils/prisma-db-connect");

async function createPost(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const { title, content } = JSON.parse(body);

      if (!title || !content) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({
            error: "Title and content are required",
          }),
        );
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      res.writeHead(201, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(post));
    } catch (error) {
      console.error(error);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Failed to create post",
        }),
      );
    }
  });
}

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(posts));
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Failed to fetch posts",
      }),
    );
  }
}

async function getPost(req, res) {
  try {
    const id = Number(req.url.split("/")[2]);

    if (Number.isNaN(id)) {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          error: "Invalid post ID",
        }),
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      return res.end(
        JSON.stringify({
          error: "Post not found",
        }),
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(post));
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Failed to fetch post",
      }),
    );
  }
}

module.exports = {
  createPost,
  getPosts,
  getPost,
};
