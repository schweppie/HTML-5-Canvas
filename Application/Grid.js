class GridData
{
    constructor(width, height, cellsize)
    {
        this.width = width;
        this.height = height;
        this.cellsize = cellsize;

        this.gridData = new Array(width * height);

        for(let i=0; i< width * height; i++)
        {
            this.gridData[i] = false;
        }
    }

    Set(x, y, value)
    {
        this.gridData[(y * this.width) + x] = value;
    }

    Get(x, y)
    {
        return this.gridData[(y * this.width) + x];
    }

    getCellsize()
    {
        return this.cellsize;
    }

    getWidth()
    {
        return this.width;
    }

    getHeight()
    {
        return this.height;
    }
}

class GridVisualizer
{
    constructor(renderer, gridData)
    {
        this.renderer = renderer;
        this.gridData = gridData;
        this.color = new RGB(50,50,225);
        this.gridColor = new RGB(140,140,140);

        renderer.AddOnRenderHandler(this.OnRender.bind(this))
    }

    OnRender(canvas)
    {
        var width = this.gridData.getWidth();
        var height = this.gridData.getHeight();
        var size = this.gridData.getCellsize();

        for(let x=0; x< width; x++)
        {
            for(let y=0; y< height; y++)
            {
                if (this.gridData.Get(x,y) == true)
                {
                    this.DrawTile(x * size, y * size , canvas)
                }

                canvas.DrawHorizontalLine(x * size, y * size, size, this.gridColor );
                canvas.DrawVerticalLine(x * size, y * size, size, this.gridColor );
            }
        }
    }

    DrawTile(x, y, canvas)
    {
        var size = this.gridData.getCellsize();
        canvas.DrawBox(x,y,x + size, y + size, this.color);
    }
}

class GridController
{
    constructor(mouseInput, renderer)
    {
        this.gridData = new GridData(20,14,32);
        this.GridVisualizer = new GridVisualizer(renderer, this.gridData);
        this.mouseInput = mouseInput;
        mouseInput.AddOnClickHandler(this.OnClick.bind(this));
        mouseInput.AddOnDragHandler(this.OnDrag.bind(this));

        this.lastdrag = [-1,-1];
    }

    OnDrag(x, y)
    {
        var cellsize = this.gridData.getCellsize();
        var floorx = Math.floor(x / cellsize);
        var floory = Math.floor(y / cellsize);

        if (this.lastdrag[0] == floorx && this.lastdrag[1] == floory)
        {
            this.lastdrag = [floorx, floory];
            return;
        }
        this.lastdrag = [floorx, floory];

        this.OnClick(x,y);
    }

    OnClick(x, y)
    {
        var cellsize = this.gridData.getCellsize();
        var floorx = Math.floor(x / cellsize);
        var floory = Math.floor(y / cellsize);


        this.gridData.Set(floorx, floory, !this.gridData.Get(floorx, floory));
    }
}
