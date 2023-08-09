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
    usuario = db.Column(db.String(250), unique=True, nullable=False)
    nombre = db.Column(db.String(250), unique=True)
    correo = db.Column(db.String(250), unique=True, nullable=False)
    contrasenha = db.Column(db.String(250), unique=False, nullable=False)
    direccion_comprador = db.Column(db.String(250))
    ciudad_comprador = db.Column(db.String(250))
    estado_comprador = db.Column(db.String(250))
    codigo_postal_comprador = db.Column(db.String(250))
    pais_comprador = db.Column(db.String(250))
    telefono_comprador = db.Column(db.String(250))
    valoracion = db.Column(db.Integer)
    cantidad_de_valoraciones = db.Column(db.Integer)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    aprobaciones = db.relationship('Aprobaciones', backref='user', cascade='all, delete-orphan', single_parent=True)


class Articulo(db.Model):
    __tablename__ = 'articulo'
    id = db.Column(db.Integer, primary_key=True)
    url_imagen = db.Column(db.String(250))
    artista_id = db.Column(db.Integer, db.ForeignKey('artista.id'))
    titulo = db.Column(db.String(250), nullable=False)
    sello = db.Column(db.String(250), unique=False)
    formato = db.Column(db.String(250))
    pais = db.Column(db.String(250), nullable=False)
    publicado = db.Column(db.String(250), nullable=False)
    genero = db.Column(db.String(250), nullable=False)
    estilos = db.Column(db.String(250))

    artista = db.relationship('Artista', uselist=False, back_populates='articulo',
                              cascade='all, delete-orphan', single_parent=True)
    tracks = db.relationship(
        'Tracks', back_populates='articulo', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'url_imagen': self.url_imagen,
            'artista_id': self.artista_id,
            'titulo': self.titulo,
            'sello': self.sello,
            'formato': self.formato,
            'pais': self.pais,
            'publicado': self.publicado,
            'genero': self.genero,
            'estilos': self.estilos
        }


class Aprobaciones(db.Model):
    __tablename__ = 'aprobaciones'
    id = db.Column(db.Integer, primary_key=True)
    url_imagen = db.Column(db.String(250))
    artista_id = db.Column(db.Integer, nullable=False)
    titulo = db.Column(db.String(250), nullable=False)
    sello = db.Column(db.String(250), unique=False)
    formato = db.Column(db.String(250))
    pais = db.Column(db.String(250), nullable=False)
    publicado = db.Column(db.String(250), nullable=False)
    genero = db.Column(db.String(250), nullable=False)
    estilos = db.Column(db.String(250))
    tipo = db.Column(db.String(15), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'url_imagen': self.url_imagen,
            'artista_id': self.artista_id,
            'titulo': self.titulo,
            'sello': self.sello,
            'formato': self.formato,
            'pais': self.pais,
            'publicado': self.publicado,
            'genero': self.genero,
            'estilos': self.estilos,
            'tipo': self.tipo,
            "user_id": self.user_id
        }

class Tracks(db.Model):
    __tablename__ = 'tracks'
    id = db.Column(db.Integer, primary_key=True)
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'))
    nombre = db.Column(db.String(250))
    posicion = db.Column(db.String(250))

    # articulo = db.relationship('Articulo', backref='tracks', overlaps="tracks_relacion")
    articulo = db.relationship('Articulo', back_populates='tracks')

    def to_dict(self):
        return {
            'id': self.id,
            'articulo_id': self.articulo_id,
            'nombre': self.nombre,
            'posicion': self.posicion
        }


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
    vendedor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    oferta_id = db.Column(db.Integer, db.ForeignKey('oferta.id'))


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


class Archivo_mensajes_admin(db.Model):
    __tablename__ = 'archivo_mensajes_admin'
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
    url_imagen = db.Column(db.Text)
    nombre = db.Column(db.String(250))
    nombre_real = db.Column(db.String(250))
    perfil = db.Column(db.Text)

    # articulo = db.relationship('Articulo', uselist=False, backref='artista', overlaps="articulo_relacion")
    articulo = db.relationship('Articulo', uselist=False, back_populates='artista',
                               cascade='all, delete-orphan', single_parent=True)

    def to_dict(self):
        return {
            'id': self.id,
            'url_imagen': self.url_imagen,
            'nombre': self.nombre,
            'nombre_real': self.nombre_real,
            'perfil': self.perfil
        }
