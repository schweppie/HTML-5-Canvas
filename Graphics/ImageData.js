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
                color = new RGB(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
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