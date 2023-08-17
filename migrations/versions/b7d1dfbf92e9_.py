"""empty message

Revision ID: b7d1dfbf92e9
Revises: 62c97a0c5624
Create Date: 2023-08-16 03:41:44.658215

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7d1dfbf92e9'
down_revision = '62c97a0c5624'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('aprobaciones', schema=None) as batch_op:
        batch_op.add_column(sa.Column('estatus', sa.String(length=15), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('aprobaciones', schema=None) as batch_op:
        batch_op.drop_column('estatus')

    # ### end Alembic commands ###
