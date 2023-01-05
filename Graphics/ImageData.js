class ImageData
{
    constructor(width, height)
    {
        this.data = [];
        this.width = width;
        this.height = height;
    }
    
    CreateDebugNoise()
    {
        for (let x = 0; x < this.width; x++)
        {
            for (let y = 0; y < this.height; y++)
            {
                color = new RGB(Math.floor(Math.random() * 255), 128, 128);
                this.data.push(color);
            }
        }
    }
    
    CreateGrid(gridsize = 2)
    {
        for (let x = 0; x < this.width; x++)
        {
            for (let y = 0; y < this.height; y++)
            {
                let black = new RGB(0,0,255);
                let white = new RGB(255,255,255);
                
                let color = white;
                
                if (x % gridsize > 0 && y % gridsize > 0)
                    color = black;

                if (x == 0 || y == 0 || x == this.width-1 || y == this.height-1)
                    color = white;
                
                this.data.push(color);
            }
        }    
    }
    
    Data()
    {
        return this.data;
    }
    
    Width()
    {
        return this.width;
    }
    
    Height()
    {
        return this.height;
    }
}