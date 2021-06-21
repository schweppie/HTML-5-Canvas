class BallData
{
    constructor(x, y, ballController, gridController)
    {
        this.gridController = gridController;
        this.position = [x,y];
        this.direction = [-1 + Math.random() * 2, -1 + Math.random() * 2];
        this.color = new RGB(255,0,0);
        this.distanceTravelled = 0;
        this.ballController = ballController;
        this.NormalizeDirection();
    }

    NormalizeDirection()
    {
        var direction = this.direction;
        var u = direction[0];
        var v = direction[1];
        var mag = Math.sqrt(u * u + v * v);
        this.direction[0] /= mag;
        this.direction[1] /= mag;
    }

    Destroy()
    {
        this.gridController = null;
        this.position = null;
        this.direction = null;
        this.color = null;
        this.ballController = null;
    }

    Move(distance)
    {
        this.position[0] += this.direction[0] * distance;
        if (this.DidHitSomething() == true)
        {
            this.direction[0] *= -1;
            this.position[0] += this.direction[0] * distance;
        }

        this.position[1] += this.direction[1] * distance;

        if (this.DidHitSomething() == true)
        {
            this.direction[1] *= -1;
            this.position[1] += this.direction[1] * distance;
        }

        this.distanceTravelled += distance;
        if (this.distanceTravelled > 10000)
        {
            this.ballController.DestroyBall(this);
        }
    }

    DidHitSomething()
    {
        return this.gridController.IsOccupied(this.GetPositions()[0],this.GetPositions()[1]);
    }

    GetPositions()
    {
        return [Math.floor(this.position[0]), Math.floor(this.position[1])];
    }

    Draw(canvas)
    {
        var pos = this.GetPositions();
        canvas.DrawBox(pos[0]-3,pos[1]-3,pos[0]+3,pos[1]+3,this.color);
    }
}

class BallVisualizer
{
    constructor(renderer)
    {

    }
}

class BallController
{
    constructor(renderer, gridController)
    {
        this.gridController = gridController;
        this.balls = [];
        renderer.AddOnRenderHandler(this.OnRender.bind(this))
    }

    DestroyAllBalls()
    {
        for (var i = this.balls.length-1; i >= 0; i--)
        {
            this.balls[i].Destroy();
            this.DestroyBall(this.balls[i]);
        }
    }

    DestroyBall(ball)
    {
        let index = this.balls.indexOf(ball);
        if (index !== -1)
        {
            this.balls.splice(index, 1);
        }
    }

    AddBall()
    {
        var ball = new BallData(400.0,500.0, this, this.gridController);
        this.balls.push(ball);
    }

    OnRender(canvas)
    {
        console.log(this.balls.length);

        for(let i=0; i< this.balls.length; i++)
        {
            var ball = this.balls[i];
            ball.Move(4);
            ball.Draw(canvas);
        }
    }
}
