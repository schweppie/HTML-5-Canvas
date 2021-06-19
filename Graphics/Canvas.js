class Canvas
{
    constructor(canvasElementId)
    {
        this.canvas = document.getElementById(canvasElementId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    getRawContext()
    {
        return this.ctx;
    }

    getRawCanvas()
    {
        return this.canvas;
    }

    getResolution()
    {
        return [this.width, this.height];
    }

    Clear()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    ClearColor(color)
    {
        var colorData = color.Get();

        for (let i = 0; i < this.width * this.height * 4; i+=4)
        {
            this.pixels[i] = colorData[0];
            this.pixels[i+1] = colorData[1];
            this.pixels[i+2] = colorData[2];
            this.pixels[i+3] = 255;
        }
    }

    ReadImageData()
    {
        this.id = this.ctx.getImageData(0, 0, this.width, this.height);
        this.pixels = this.id.data;
    }

    DrawPixel(x, y, color)
    {
        var off = (y * this.id.width + x) * 4;
        var colorData = color.Get();

        this.pixels[off] = colorData[0];
        this.pixels[off + 1] = colorData[1];
        this.pixels[off + 2] = colorData[2];
        this.pixels[off + 3] = 255;
    }

    DrawVerticalLineCentered(x, height, color)
    {
        var center = Math.floor(this.height * 0.5);
        var from = Math.max(0, center - height);
        var to = Math.min(this.height, center + height);

        for (let i = from; i < to; i++)
        {
            this.DrawPixel(x, i, color);
        }
    }

    DrawVerticalLine(x, y, length, color)
    {
        for (let i = y; i < y + length; i++)
        {
            this.DrawPixel(x, i, color);
        }
    }

    DrawHorizontalLine(x, y, length, color)
    {
        for (let i = x; i < x + length; i++)
        {
            this.DrawPixel(i, y, color);
        }
    }

    DrawBox(x,y,tx,ty,color)
    {
        for(let i = y; i < ty; i++ )
        {
            this.DrawHorizontalLine(x,i,tx-x,color);
        }
    }

    MovePixelsUp()
    {
        this.pixels.copyWithin(0, this.width * 4);
    }

    FadePixels(fade)
    {
        var width = this.width;
        var height = this.height;

        for (let i = 0; i < width * height * 4; i+=4)
        {
            this.pixels[i+3] = this.pixels[i+3] - fade;
        }
    }

    WriteImageData()
    {
        this.ctx.putImageData(this.id, 0, 0);
    }
}

