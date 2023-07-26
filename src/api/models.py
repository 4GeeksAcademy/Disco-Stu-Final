from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(80), unique=False, nullable=False)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return f'<User {self.email}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "email": self.email,
#             # do not serialize the password, its a security breach
#         }

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    nombre_real = db.Column(db.String(250), unique=True, nullable=False)
    mail = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    direccion_comprador = db.Column(db.String(250))
    ciudad_comprador = db.Column(db.String(250))
    estado_comprador = db.Column(db.String(250))
    codigo_postal_comprador = db.Column(db.String(250))
    pais_comprador = db.Column(db.String(250))
    telefono_comprador = db.Column(db.String(250))
    valoracion = db.Column(db.Integer)
    cantidad_de_valoraciones = db.Column(db.Integer)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)


class Articulo(db.Model):
    __tablename__ = 'articulo'
    id = db.Column(db.Integer, primary_key=True)
    url_imagen = db.Column(db.String(250))
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'))
    titulo = db.Column(db.String(250), nullable=False)
    sello = db.Column(db.String(250), unique=True)
    formato = db.Column(db.String(250))
    pais = db.Column(db.String(250), nullable=False)
    publicado = db.Column(db.String(250), nullable=False)
    genero = db.Column(db.String(250), nullable=False)
    estilos = db.Column(db.String(250), nullable=False)

class Tracks(db.Model):
    __tablename__ = 'tracks'
    id = db.Column(db.Integer, primary_key=True)
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))
    nombre = db.Column(db.String(250))
    posicion = db.Column(db.String(250))

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))

class Coleccion(db.Model):
    __tablename__ = 'coleccion'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))

class Carrito(db.Model):
    __tablename__ = 'carrito'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))

class Bandeja_de_entrada(db.Model):
    _tablename__ = 'bandeja_de_entrada'
    id = db.Column(db.Integer, primary_key=True)
    emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receptor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    asunto = db.Column(db.String(250))
    mensaje = db.Column(db.String(250))
    fecha = db.Column(db.String(250))

class Bandeja_de_entrada_admin(db.Model):
    _tablename__ = 'bandeja_de_entrada_admin'
    id = db.Column(db.Integer, primary_key=True)
    emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    asunto = db.Column(db.String(250))
    mensaje = db.Column(db.String(250))
    fecha = db.Column(db.String(250))

class Mensajes_enviados(db.Model):
    _tablename__ = 'mensajes_enviados'
    id = db.Column(db.Integer, primary_key=True)
    emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receptor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    asunto = db.Column(db.String(250))
    mensaje = db.Column(db.String(250))
    fecha = db.Column(db.String(250))

class Mensajes_eliminados(db.Model):
    _tablename__ = 'mensajes_eliminados'
    id = db.Column(db.Integer, primary_key=True)
    emisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receptor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    asunto = db.Column(db.String(250))
    mensaje = db.Column(db.String(250))
    fecha = db.Column(db.String(250))

class Ofertas(db.Model):
    __tablename__ = 'ofertas'
    id = db.Column(db.Integer, primary_key=True)
    vendedor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))
    condicion_funda = db.Column(db.String(250))
    condicion_soporte = db.Column(db.String(250))
    precio = db.Column(db.Integer)
    comentario = db.Column(db.String(250))

class Pedido(db.Model):
    __tablename__ = 'pedido'
    id = db.Column(db.Integer, primary_key=True)
    precio_envio = db.Column(db.Integer)
    precio_total = db.Column(db.Integer)
    impuesto = db.Column(db.Integer)

class Pedido_articulos(db.Model):
    __tablename__ = 'pedido_articulos'
    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))

class Artista(db.Model):
    __tablename__ = 'artista'
    id = db.Column(db.Integer, primary_key=True)
    url_imagen = db.Column(db.String(250))
    nombre = db.Column(db.String(250))
    nombre_real = db.Column(db.String(250))
    perfil = db.Column(db.String(250))



