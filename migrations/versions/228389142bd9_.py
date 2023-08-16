"""empty message

Revision ID: 228389142bd9
Revises: fd686e3294f8
Create Date: 2023-08-16 01:22:46.338048

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '228389142bd9'
down_revision = 'fd686e3294f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.drop_constraint('pedido_articulo_id_fkey', type_='foreignkey')
        batch_op.drop_column('articulo_id')

    with op.batch_alter_table('pedido_articulos', schema=None) as batch_op:
        batch_op.alter_column('pedido_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('articulo_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido_articulos', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
        batch_op.alter_column('articulo_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('pedido_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.add_column(sa.Column('articulo_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('pedido_articulo_id_fkey', 'articulo', ['articulo_id'], ['id'])

    # ### end Alembic commands ###
