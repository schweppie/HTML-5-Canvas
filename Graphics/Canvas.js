class Canvas
{
    constructor(canvasElementId)
    {
        this.canvas = document.getElementById(canvasElementId);
        this.canvas.width = window.innerWidth ;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(1,1);
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

    DrawLine(x0, y0, x1, y1, color)
    {
        if (x0 === x1 && y0 === y1)
        {
            this.DrawPixel(x0, y0, color);
            return;
        }

        var dx = x1 - x0;
        var sx = (dx < 0) ? -1 : 1;
        var dy = y1 - y0;
        var sy = (dy < 0) ? -1 : 1;

        if (Math.abs(dy) < Math.abs(dx))
        {
            var slope = dy / dx;
            var pitch = y0 - slope * x0;
            while (x0 !== x1)
            {
                this.DrawPixel(x0, (Math.round(slope * x0 + pitch)), color);
                x0 += sx;
            }
        }
        else
        {
            var slope = dx / dy;
            var pitch = x0 - slope * y0;

            while (y0 !== y1)
            {
                this.DrawPixel( (Math.round(slope * y0 + pitch)), y0, color);
                y0 += sy;
            }
        }

        this.DrawPixel(x1, y1, color);
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

    Fade(fade, fadeColor)
    {
        var width = this.width;
        var height = this.height;

        var fadeColorData = fadeColor.Get();

        for (let i = 0; i < width * height * 4; i+=4)
        {
            this.pixels[i] = Math.floor((this.pixels[i] * fade) + (fadeColorData[0] * (1.0 - fade)));
            this.pixels[i+1] = Math.floor((this.pixels[i+1] * fade) + (fadeColorData[1] * (1.0 - fade)));
            this.pixels[i+2] = Math.floor((this.pixels[i+2] * fade) + (fadeColorData[2] * (1.0 - fade)));
        }
    }

    WriteImageData()
    {
        this.ctx.putImageData(this.id, 0, 0);
    }
}

