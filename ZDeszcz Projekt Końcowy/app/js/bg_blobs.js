class BlobGenerator {
  constructor(amount, colors, pageWidth, pageHeight, screenHeight) {
    this.amount = amount;
    this.colors = colors;
    this.width = pageWidth;
    this.height = pageHeight;
    this.screenHeight = screenHeight;
    this.bgSections = Math.round(pageHeight / screenHeight);
  }

  generate() {
    const blobs = [];
    for (let i = 0; i < this.amount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      // pushing 2 svg blobs (second needed to animating them later)
      blobs.push(
        `
            <svg
              class="blob"
              id="blob-${i}"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="${color}"
                d="M43.5,-26.1C52.5,-9.5,53.2,10.8,44.6,22.2C36,33.6,18,36.1,-0.4,36.3C-18.9,36.6,-37.8,34.6,-43.3,25C-48.9,15.4,-41.2,-2,-31.7,-18.8C-22.3,-35.6,-11.1,-51.9,3,-53.6C17.2,-55.4,34.5,-42.6,43.5,-26.1Z"
                transform="translate(100 100)"
              />
            </svg>`,
        `
            <svg
              class="blob--anim"
              id="blob-${i}--anim"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="${color}"
                d="M43.5,-26.1C52.5,-9.5,53.2,10.8,44.6,22.2C36,33.6,18,36.1,-0.4,36.3C-18.9,36.6,-37.8,34.6,-43.3,25C-48.9,15.4,-41.2,-2,-31.7,-18.8C-22.3,-35.6,-11.1,-51.9,3,-53.6C17.2,-55.4,34.5,-42.6,43.5,-26.1Z"
                transform="translate(100 100)"
              />
            </svg>`
      );
    }
    this.insert(blobs);
    this.style();
  }

  insert(blobs) {
    const bgElement = document.getElementById("bg-container");
    blobs.forEach((blob) => {
      bgElement.innerHTML += blob;
    });
  }

  style() {
    // Calc blobs displayed on one screen height
    const blobsPerScreen = Math.round(this.amount / this.bgSections);
    let i = 0;
    document.querySelectorAll(".blob").forEach((blob, index) => {
      const left = Math.floor((Math.random() * this.width) / 2);
      let top;
      do {
        top =
          Math.floor((Math.random() * this.screenHeight) / 2) +
          (i - 2 * Math.random()) * this.screenHeight;
      } while (top > this.height - 1000);
      const opacity = Math.random() / 4;
      blob.style.top = `${top > this.height ? top - 1000 : top}px`;
      blob.style.left = `${left}px`;
      blob.style.opacity = `${opacity}`;

      // second blob element needed to animating
      const secondBlob = document.getElementById(`${blob.id}--anim`);

      secondBlob.style.top = `${top}px`;
      secondBlob.style.left = `${left}px`;
      secondBlob.style.opacity = `${opacity}`;
      (index + 2) % blobsPerScreen == 0 && i++;
    });
  }
}

const height = document.body.scrollHeight;
const screenHeight = window.innerHeight;
const blobGenerator = new BlobGenerator(
  // blobs amount = "scroll sections" * 10
  Math.round(height / screenHeight) * 10,
  ["#BF3D5C", "#104686"],
  document.body.scrollWidth,
  height,
  screenHeight
);

blobGenerator.generate();
