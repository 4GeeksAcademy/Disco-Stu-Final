"""empty message

Revision ID: 7a5cb11c500e
Revises: 9c4b350ce87a
Create Date: 2023-08-10 01:20:01.546632

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7a5cb11c500e'
down_revision = '9c4b350ce87a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carrito', schema=None) as batch_op:
        batch_op.add_column(sa.Column('vendedor_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('oferta_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('carrito_articulo_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['vendedor_id'], ['id'])
        batch_op.create_foreign_key(None, 'ofertas', ['oferta_id'], ['id'])
        batch_op.drop_column('articulo_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carrito', schema=None) as batch_op:
        batch_op.add_column(sa.Column('articulo_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('carrito_articulo_id_fkey', 'articulo', ['articulo_id'], ['id'])
        batch_op.drop_column('oferta_id')
        batch_op.drop_column('vendedor_id')

    # ### end Alembic commands ###
