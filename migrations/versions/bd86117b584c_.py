"""empty message

Revision ID: bd86117b584c
Revises: f0dd77c226a0
Create Date: 2023-07-30 20:56:03.040079

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd86117b584c'
down_revision = 'f0dd77c226a0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articulo', schema=None) as batch_op:
        batch_op.alter_column('estilos',
               existing_type=sa.VARCHAR(length=250),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articulo', schema=None) as batch_op:
        batch_op.alter_column('estilos',
               existing_type=sa.VARCHAR(length=250),
               nullable=False)

    # ### end Alembic commands ###