import bpy

for item in bpy.data.objects:
    list = []
    if item.type == 'MESH':
        for vertex in item.data.vertices:
            print(vertex.co)
            list.append([ round(vertex.co[0]), round(vertex.co[1])])

    print(list)
